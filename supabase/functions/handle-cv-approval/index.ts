import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");
    const requestId = url.searchParams.get("requestId");

    console.log("Received approval action:", { action, requestId });

    if (!action || !requestId) {
      return new Response(
        "Missing action or requestId parameter",
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the request details
    const { data: request, error: fetchError } = await supabase
      .from("cv_download_requests")
      .select("*")
      .eq("id", requestId)
      .single();

    if (fetchError || !request) {
      console.error("Error fetching request:", fetchError);
      return new Response(
        "Request not found",
        { status: 404, headers: { "Content-Type": "text/html" } }
      );
    }

    if (request.status !== "pending") {
      return new Response(
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Already Processed</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 50px 40px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); max-width: 500px; margin: 20px; text-align: center;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h1 style="color: #3b82f6; margin: 0 0 16px; font-size: 32px; font-weight: 700;">Already Processed</h1>
              <p style="color: #666; font-size: 18px; line-height: 1.6; margin: 0;">
                This request has already been <strong style="color: #333;">${request.status}</strong>.
              </p>
              <p style="color: #9ca3af; font-size: 14px; margin: 24px 0 0;">You can safely close this window.</p>
            </div>
          </body>
        </html>`,
        { status: 200, headers: { "Content-Type": "text/html" } }
      );
    }

    if (action === "approve") {
      // Update request status to approved
      const { error: updateError } = await supabase
        .from("cv_download_requests")
        .update({ 
          status: "approved",
          responded_at: new Date().toISOString()
        })
        .eq("id", requestId);

      if (updateError) {
        console.error("Error updating request:", updateError);
        throw updateError;
      }

      // Send CV to requester
      try {
        const emailResult = await resend.emails.send({
          from: "Francis Asiedu <onboarding@resend.dev>",
          to: [request.requester_email],
          subject: "Your CV Download Request - Approved ✓",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 10px;">✓</div>
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Request Approved!</h1>
                  </div>
                  <div style="padding: 40px 30px;">
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Hi ${request.requester_name},</p>
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Great news! Your CV download request has been approved.</p>
                    <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 4px;">
                      <p style="color: #1e40af; font-size: 15px; line-height: 1.6; margin: 0;">
                        <strong>📧 Next Step:</strong> Simply reply to this email and you'll receive the CV document directly in your inbox.
                      </p>
                    </div>
                    <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                      Best regards,<br>
                      <strong style="color: #333;">Francis Asiedu</strong>
                    </p>
                  </div>
                  <div style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                      This email was sent because you requested access to Francis Asiedu's CV.
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        console.log("Approval email sent successfully:", JSON.stringify(emailResult));
      } catch (emailError: any) {
        console.error("CRITICAL: Failed to send approval email:", {
          error: emailError.message,
          stack: emailError.stack,
          requesterEmail: request.requester_email,
          requesterName: request.requester_name
        });
      }

      return new Response(
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Request Approved</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 50px 40px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); max-width: 500px; margin: 20px; text-align: center;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h1 style="color: #10b981; margin: 0 0 16px; font-size: 32px; font-weight: 700;">Request Approved!</h1>
              <p style="color: #666; font-size: 18px; line-height: 1.6; margin: 0 0 24px;">
                The CV request from <strong style="color: #333;">${request.requester_name}</strong> has been successfully approved.
              </p>
              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 8px; text-align: left;">
                <p style="color: #1e40af; font-size: 15px; line-height: 1.6; margin: 0;">
                  <strong>📧 Email Sent:</strong> ${request.requester_email} has been notified and will receive the CV upon replying to the email.
                </p>
              </div>
              <p style="color: #9ca3af; font-size: 14px; margin: 24px 0 0;">You can safely close this window.</p>
            </div>
          </body>
        </html>`,
        { status: 200, headers: { "Content-Type": "text/html" } }
      );
    } else if (action === "reject") {
      // Update request status to rejected
      const { error: updateError } = await supabase
        .from("cv_download_requests")
        .update({ 
          status: "rejected",
          responded_at: new Date().toISOString()
        })
        .eq("id", requestId);

      if (updateError) {
        console.error("Error updating request:", updateError);
        throw updateError;
      }

      // Send rejection email to requester
      try {
        const emailResult = await resend.emails.send({
          from: "Francis Asiedu <onboarding@resend.dev>",
          to: [request.requester_email],
          subject: "Your CV Download Request - Update",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                  <div style="background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">CV Request Update</h1>
                  </div>
                  <div style="padding: 40px 30px;">
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Hi ${request.requester_name},</p>
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">Thank you for your interest in my CV. Unfortunately, I'm unable to fulfill your request at this time.</p>
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">If you have any questions or would like to discuss further, please feel free to reach out.</p>
                    <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 30px 0 0;">
                      Best regards,<br>
                      <strong style="color: #333;">Francis Asiedu</strong>
                    </p>
                  </div>
                  <div style="background-color: #f9fafb; padding: 20px 30px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                      This email was sent in response to your CV download request.
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
        });

        console.log("Rejection email sent successfully:", JSON.stringify(emailResult));
      } catch (emailError: any) {
        console.error("CRITICAL: Failed to send rejection email:", {
          error: emailError.message,
          stack: emailError.stack,
          requesterEmail: request.requester_email,
          requesterName: request.requester_name
        });
      }

      return new Response(
        `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Request Rejected</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 50px 40px; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); max-width: 500px; margin: 20px; text-align: center;">
              <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <h1 style="color: #6b7280; margin: 0 0 16px; font-size: 32px; font-weight: 700;">Request Declined</h1>
              <p style="color: #666; font-size: 18px; line-height: 1.6; margin: 0 0 24px;">
                The CV request from <strong style="color: #333;">${request.requester_name}</strong> has been declined.
              </p>
              <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 8px; text-align: left;">
                <p style="color: #92400e; font-size: 15px; line-height: 1.6; margin: 0;">
                  <strong>📧 Email Sent:</strong> ${request.requester_email} has been notified of your decision.
                </p>
              </div>
              <p style="color: #9ca3af; font-size: 14px; margin: 24px 0 0;">You can safely close this window.</p>
            </div>
          </body>
        </html>`,
        { status: 200, headers: { "Content-Type": "text/html" } }
      );
    } else {
      return new Response(
        "Invalid action",
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }
  } catch (error: any) {
    console.error("Error in handle-cv-approval function:", error);
    return new Response(
      `<html><body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;"><h2>Error</h2><p>${error.message || "An error occurred"}</p></body></html>`,
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
};

serve(handler);
