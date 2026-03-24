import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContactInfo, BUSINESS_MODELS } from "@/lib/questionnaire-data";
import { User, Mail, Phone, Building2, Briefcase, Shield, Clock, BarChart3 } from "lucide-react";

interface ContactStepProps {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
  errors: Record<string, string>;
}

export function ContactStep({ data, onChange, errors }: ContactStepProps) {
  const update = (field: keyof ContactInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-7 animate-fade-in-up">

      {/* Header */}
      <div className="space-y-3 text-center">
        <span className="section-label">Diagnóstico Gratuito · Chordata Consultoria</span>
        <h2 className="section-title">
          Descubra o{" "}
          <span className="text-blue-400">Score de Maturidade</span>{" "}
          do seu Negócio
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Em poucos minutos, você terá um retrato claro de como sua empresa está em <strong className="text-foreground">6 dimensões essenciais</strong> — e o que fazer para evoluir.
        </p>
      </div>

      {/* Benefícios rápidos */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Clock, label: "~8 minutos", sub: "para completar" },
          { icon: BarChart3, label: "6 dimensões", sub: "analisadas" },
          { icon: Shield, label: "100% privado", sub: "seus dados protegidos" },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="card-dark rounded-xl p-3 text-center space-y-1">
            <Icon className="h-4 w-4 text-blue-400 mx-auto" />
            <p className="text-xs font-semibold text-foreground">{label}</p>
            <p className="text-[10px] text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>

      {/* Trust message */}
      <div className="glass-card rounded-xl p-4 flex items-start gap-3 border-l-2 border-l-blue-500">
        <Shield className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Não existem respostas certas ou erradas.</span>{" "}
          Quanto mais honesto você for, mais preciso e útil será o seu resultado. Seus dados são usados exclusivamente para gerar seu relatório personalizado.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <span className="section-label">Suas informações</span>

        <div className="grid gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">Nome completo *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Seu nome completo"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                className="glass-card pl-10 focus:border-blue-500/50"
              />
            </div>
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">E-mail *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="glass-card pl-10 focus:border-blue-500/50"
                />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-sm font-medium">WhatsApp</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={data.phone ?? ""}
                  onChange={(e) => update("phone", e.target.value)}
                  className="glass-card pl-10 focus:border-blue-500/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="company" className="text-sm font-medium">Empresa *</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="company"
                placeholder="Nome da sua empresa"
                value={data.company}
                onChange={(e) => update("company", e.target.value)}
                className="glass-card pl-10 focus:border-blue-500/50"
              />
            </div>
            {errors.company && <p className="text-xs text-destructive">{errors.company}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Modelo de Negócio *</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10 pointer-events-none" />
              <Select value={data.businessModel} onValueChange={(v) => update("businessModel", v)}>
                <SelectTrigger className="glass-card pl-10">
                  <SelectValue placeholder="Selecione seu modelo..." />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_MODELS.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.businessModel && <p className="text-xs text-destructive">{errors.businessModel}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}