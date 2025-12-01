import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ route }: { route: string }) {
    return (
        <div className="mb-6">
            <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all text-muted-foreground">
                <Link href={route}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Voltar
                </Link>
            </Button>
        </div>
    );
}