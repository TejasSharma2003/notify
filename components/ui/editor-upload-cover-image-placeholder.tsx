import { protectedEditorConfig } from "@/config/protected";
import { ImagePlus } from 'lucide-react';
import React from "react";

const EditorUploadCoverImagePlaceHolder = () => {
    return (
        <div className="col-span-full max-w-2xl">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                    <ImagePlus className="mx-auto h-12 w-12 text-gray-300" aria-hidden/>
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <p className="pl-1">{protectedEditorConfig.formImageNote}</p>
                    </div>
                    <p className="text-sm leading-5 text-gray-600">
                        {protectedEditorConfig.formImageSize}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EditorUploadCoverImagePlaceHolder;

