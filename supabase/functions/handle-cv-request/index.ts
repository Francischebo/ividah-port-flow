import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const adminEmail = Deno.env.get("ADMIN_EMAIL")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CVRequest {
  name: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email }: CVRequest = await req.json();

    console.log("Received CV request:", { name, email });

    // Validate input
    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get IP address from request headers
    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Insert request into database
    const { data: requestData, error: dbError } = await supabase
      .from("cv_download_requests")
      .insert({
        requester_name: name.trim(),
        requester_email: email.trim().toLowerCase(),
        ip_address: ipAddress,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Request saved to database:", requestData);

    // Send notification email to admin
    try {
      const emailResponse = await resend.emails.send({
        from: "CV Request <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New CV Download Request from ${name}`,
        html: `
          <h2>New CV Download Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>IP Address:</strong> ${ipAddress}</p>
          <p><strong>Requested at:</strong> ${new Date().toLocaleString()}</p>
          <hr>
          <p>Please review and respond to this request.</p>
        `,
      });

      console.log("Admin notification sent:", emailResponse);
    } catch (emailError) {
      console.error("Failed to send admin notification:", emailError);
      // Don't fail the request if email fails
    }

    // Send confirmation email to requester
    try {
      await resend.emails.send({
        from: "CV Request <onboarding@resend.dev>",
        to: [email],
        subject: "CV Download Request Received",
        html: `
          <h2>Thank you for your interest!</h2>
          <p>Hi ${name},</p>
          <p>We have received your CV download request. I'll review it and get back to you shortly.</p>
          <p>Best regards,<br>Francis Asiedu</p>
        `,
      });

      console.log("Confirmation email sent to requester");
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't fail the request if email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Request submitted successfully",
        requestId: requestData.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in handle-cv-request function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
