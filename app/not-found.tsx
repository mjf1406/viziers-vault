/** @format */

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import NotFoundImage from "@/public/img/not-found.png";

export default function NotFound() {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center space-y-6 p-6">
                    <Image
                        src={NotFoundImage}
                        alt="404 Not Found"
                        width={300}
                        height={300}
                        placeholder="blur"
                        className="object-contain"
                    />
                    <h1 className="text-lg">404 - Page Not Found</h1>
                    <p className="text-center text-muted-foreground">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <Button asChild>
                        <Link href="/">Go Back Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
