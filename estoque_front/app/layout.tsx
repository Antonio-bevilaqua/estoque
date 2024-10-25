import { siteConfig } from "@/config/site";
import AuthProvider from "@/provider/auth.provider";
import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import DirectionProvider from "@/provider/direction.provider";
import Providers from "@/provider/providers";
import TanstackProvider from "@/provider/providers.client";
import "flatpickr/dist/themes/light.css";
import "simplebar-react/dist/simplebar.min.css";
import "./assets/scss/globals.scss";
import "./assets/scss/theme.scss";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"ptBR"} suppressHydrationWarning={true}>
      <link rel="icon" href="/favicon.png" />
      <TanstackProvider>
        <Providers>
          <DirectionProvider>
            <AuthProvider>
              <DashBoardLayoutProvider>{children}</DashBoardLayoutProvider>
            </AuthProvider>
          </DirectionProvider>
        </Providers>
      </TanstackProvider>
    </html>
  );
}
