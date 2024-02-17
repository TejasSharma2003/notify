import { mainPageTermsConfig } from "@/config/main/pages";
import React from "react";

const MainTermsPage = () => {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl">
                <h1 className="mt-2 text-3xl font-heading font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {mainPageTermsConfig.title}
                </h1>

                {mainPageTermsConfig.paragraphs.map((item) => (
                    <>
                        <p className="text-md mt-8 leading-8 text-gray-600">
                            {item.description}
                        </p>
                    </>
                ))}
            </div>
        </div>
    );
};

export default MainTermsPage;

