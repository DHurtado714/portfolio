import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

export default async function RootPage() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("NEXT_LOCALE")?.value;
  if (raw && LOCALES.includes(raw as Locale)) {
    redirect(`/${raw as Locale}`);
  }

  const headersList = await headers();
  const acceptLang = headersList.get("accept-language") ?? "";
  const locale: Locale = acceptLang.toLowerCase().includes("es") ? "es" : DEFAULT_LOCALE;
  redirect(`/${locale}`);
}
