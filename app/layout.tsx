import { Provider } from "@/context/contentfulSdk/Provider";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
    return (
        <html lang="en">
            <head />
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
