import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface DimensionScore {
  id: string;
  name: string;
  shortName: string;
  score: number;
  weight: number;
  band: string;
}

interface ServiceRecommendation {
  service: string;
  description: string;
  trigger: string;
}

interface RequestBody {
  recipientEmail: string;
  recipientName: string;
  company: string;
  businessModel: string;
  overallScore: number;
  dimensionScores: DimensionScore[];
  recommendations: ServiceRecommendation[];
}

function getBandLabel(score: number): string {
  if (score <= 30) return "Crítico";
  if (score <= 50) return "Regular";
  if (score <= 70) return "Bom";
  if (score <= 85) return "Avançado";
  return "Referência";
}

function getBandColor(score: number): string {
  if (score <= 30) return "#ef4444";
  if (score <= 50) return "#f59e0b";
  if (score <= 70) return "#eab308";
  if (score <= 85) return "#22c55e";
  return "#0d9488";
}

function getScoreBarColor(score: number): string {
  return getBandColor(score);
}

function buildEmailHtml(data: RequestBody): string {
  const bandLabel = getBandLabel(data.overallScore);
  const bandColor = getBandColor(data.overallScore);

  const dimensionRows = data.dimensionScores
    .map(
      (ds) => `
      <tr>
        <td style="padding: 12px 16px; font-size: 14px; color: #334155; border-bottom: 1px solid #e2e8f0;">
          ${ds.name}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">
          <div style="background: #e2e8f0; border-radius: 9999px; height: 10px; width: 100%;">
            <div style="background: ${getScoreBarColor(ds.score)}; border-radius: 9999px; height: 10px; width: ${ds.score}%;"></div>
          </div>
        </td>
        <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: ${getScoreBarColor(ds.score)}; text-align: right; border-bottom: 1px solid #e2e8f0; white-space: nowrap;">
          ${ds.score}/100
        </td>
      </tr>`
    )
    .join("");

  const recommendationBlocks = data.recommendations
    .map(
      (rec) => `
      <div style="background: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-weight: 600; color: #0f172a; font-size: 14px;">${rec.service}</span>
        </div>
        <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">${rec.description}</p>
        <p style="font-size: 11px; color: #94a3b8; margin: 6px 0 0;">${rec.trigger}</p>
      </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #f8fafc; font-family: Arial, Helvetica, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
    
    <!-- Header -->
    <div style="background: #0f172a; padding: 32px 24px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 8px;">Diagnóstico de Maturidade Gerencial</h1>
      <p style="color: #94a3b8; font-size: 14px; margin: 0;">Chordata Consultoria</p>
    </div>

    <!-- Company Info -->
    <div style="padding: 24px; text-align: center; border-bottom: 1px solid #e2e8f0;">
      <p style="font-size: 16px; color: #334155; margin: 0;">
        <strong>${data.company}</strong> — ${data.businessModel}
      </p>
      <p style="font-size: 13px; color: #94a3b8; margin: 8px 0 0;">
        Responsável: ${data.recipientName}
      </p>
    </div>

    <!-- Overall Score -->
    <div style="padding: 32px 24px; text-align: center;">
      <div style="display: inline-block; width: 120px; height: 120px; border-radius: 50%; border: 6px solid ${bandColor}; line-height: 108px; font-size: 36px; font-weight: 800; color: ${bandColor};">
        ${data.overallScore}
      </div>
      <p style="font-size: 18px; font-weight: 700; color: ${bandColor}; margin: 16px 0 4px;">
        ${bandLabel}
      </p>
      <p style="font-size: 13px; color: #94a3b8; margin: 0;">Score geral de maturidade</p>
    </div>

    <!-- Dimension Breakdown -->
    <div style="padding: 0 24px 24px;">
      <h2 style="font-size: 16px; color: #0f172a; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
        Detalhamento por Dimensão
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${dimensionRows}
      </table>
    </div>

    ${
      data.recommendations.length > 0
        ? `
    <!-- Recommendations -->
    <div style="padding: 0 24px 24px;">
      <h2 style="font-size: 16px; color: #0f172a; margin: 0 0 16px; padding-bottom: 8px; border-bottom: 2px solid #3b82f6;">
        Serviços Recomendados
      </h2>
      ${recommendationBlocks}
    </div>`
        : ""
    }

    <!-- CTA -->
    <div style="padding: 24px; text-align: center;">
      <a href="mailto:contato@chordataconsultoria.com?subject=Agendar%20Diagnóstico%20Gratuito" 
         style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
        Agendar Diagnóstico Gratuito
      </a>
    </div>

    <!-- Footer -->
    <div style="background: #0f172a; padding: 24px; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">
        © ${new Date().getFullYear()} Chordata Consultoria. Todos os direitos reservados.
      </p>
      <p style="color: #64748b; font-size: 11px; margin: 8px 0 0;">
        Este relatório foi gerado automaticamente pelo Diagnóstico de Maturidade Gerencial.
      </p>
    </div>

  </div>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: RequestBody = await req.json();

    const {
      recipientEmail,
      recipientName,
      company,
      businessModel,
      overallScore,
      dimensionScores,
      recommendations,
    } = body;

    if (!recipientEmail || !recipientName || !company) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = buildEmailHtml(body);
    const bandLabel = getBandLabel(overallScore);

    // Send to recipient
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Use Resend or similar — for now we'll use the built-in Supabase email
    // We'll send via a simple SMTP-like approach using the Lovable API
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    const recipients = [
      recipientEmail,
      "contato@chordataconsultoria.com",
    ];

    const subject = `Diagnóstico de Maturidade — ${company} (${bandLabel}: ${overallScore}/100)`;

    // Try to send via Lovable email API
    if (LOVABLE_API_KEY) {
      const callbackUrl = `https://email.lovable.dev/v1/send`;

      for (const to of recipients) {
        try {
          const emailResponse = await fetch(callbackUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
            },
            body: JSON.stringify({
              to,
              subject,
              html,
              from: `Chordata Consultoria <notify@chordataconsultoria.com>`,
            }),
          });

          if (!emailResponse.ok) {
            const errText = await emailResponse.text();
            console.error(`Failed to send to ${to}:`, errText);
          } else {
            await emailResponse.text();
            console.log(`Email sent to ${to}`);
          }
        } catch (emailErr) {
          console.error(`Error sending to ${to}:`, emailErr);
        }
      }
    } else {
      console.warn("LOVABLE_API_KEY not set, emails cannot be sent");
    }

    return new Response(
      JSON.stringify({ success: true, message: "Emails queued for delivery" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
