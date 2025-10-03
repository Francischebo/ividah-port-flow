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
        `<html><body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;"><h2>Request Already Processed</h2><p>This request has already been ${request.status}.</p></body></html>`,
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
        await resend.emails.send({
          from: "Francis Asiedu <onboarding@resend.dev>",
          to: [request.requester_email],
          subject: "Your CV Download Request - Approved",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">CV Access Granted</h2>
              <p>Hi ${request.requester_name},</p>
              <p>Thank you for your interest! Your request has been approved.</p>
              <p style="background-color: #f0f9ff; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                <strong>Note:</strong> Please reply to this email to receive the CV document directly.
              </p>
              <p>Best regards,<br>Francis Asiedu</p>
            </div>
          `,
        });

        console.log("Approval email sent to requester");
      } catch (emailError) {
        console.error("Failed to send approval email:", emailError);
      }

      return new Response(
        `<html><body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f0fdf4;"><div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto;"><h2 style="color: #10b981;">✓ Request Approved</h2><p style="color: #666;">The CV request from <strong>${request.requester_name}</strong> has been approved and they have been notified via email.</p></div></body></html>`,
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
        await resend.emails.send({
          from: "Francis Asiedu <onboarding@resend.dev>",
          to: [request.requester_email],
          subject: "Your CV Download Request - Update",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">CV Request Update</h2>
              <p>Hi ${request.requester_name},</p>
              <p>Thank you for your interest. Unfortunately, I'm unable to fulfill your CV request at this time.</p>
              <p>If you have any questions, please feel free to reach out.</p>
              <p>Best regards,<br>Francis Asiedu</p>
            </div>
          `,
        });

        console.log("Rejection email sent to requester");
      } catch (emailError) {
        console.error("Failed to send rejection email:", emailError);
      }

      return new Response(
        `<html><body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #fef2f2;"><div style="background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto;"><h2 style="color: #ef4444;">Request Rejected</h2><p style="color: #666;">The CV request from <strong>${request.requester_name}</strong> has been rejected and they have been notified via email.</p></div></body></html>`,
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
