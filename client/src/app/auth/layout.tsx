"use client";

import { ReactNode } from "react";
import { FileText } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 items-center justify-center p-12">
        <div className="max-w-md text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FileText className="h-12 w-12 text-primary" />
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VietAu Academy
            </span>
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Kết nối giáo dục & nâng tầm cuộc sống
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Chương trình du học chất lượng cao tại Hàn Quốc, Nhật Bản, Đài Loan,
            Đức, Mỹ, Úc.
          </p>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VietAu Academy
            </span>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
