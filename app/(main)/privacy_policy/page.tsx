import React from "react";
import { mainPagePolicyConfig } from "@/config/main/pages";

export const dynamic = "force-static"

const MainPolicyPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
                <h1 className="mt-2 text-3xl font-heading font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {mainPagePolicyConfig.title}
                </h1>
                <h2 className="text-md my-6 leading-7 text-gray-600">
                    {mainPagePolicyConfig.description}
                </h2>
                {mainPagePolicyConfig.paragraphs.map((item) => (
                    <>
                        <p className="mt-6 text-xl font-semibold text-gray-900">
                            {item.title}
                        </p>
                        <p className="text-md mt-2 leading-8 text-gray-600">
                            {item.description}
                        </p>
                    </>
                ))}
            </div>
        </div>
    );
};

export default MainPolicyPage;

