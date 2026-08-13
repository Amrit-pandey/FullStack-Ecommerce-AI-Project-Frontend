import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { onboarding, upload_image } from "@/services/user.service";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

type OnboardingProps = {
    onComplete: () => void
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
    const [fullName, setFullName] = useState("")
    const [profileFile, setProfileFile] = useState<File | null>(null)
    const [profilePreview, setProfilePreview] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    console.log(profilePreview, "profile")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setFullName(value)
    }

    const handleImageChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return;
        setProfileFile(file)
        // display's the image which one you have selected
        setProfilePreview(URL.createObjectURL(file))
    }

    const handleSubmit = async(e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            if(profileFile){
                await upload_image(profileFile) 
            }
            const response = await onboarding(fullName)
            if(response.message){
                toast.add({type: "success", description: response.message})
                onComplete()
            }
        } catch (error) {
            toast.add({type: "warning", description: "Something went wrong"})
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full space-y-6"
        >
            <div className="flex justify-center">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="relative cursor-pointer rounded-full"
                >
                    <Avatar className="size-28">
                        <AvatarImage
                            src={profilePreview}
                            alt="Profile"
                        />

                        <AvatarFallback>
                            <Camera className="size-8" />
                        </AvatarFallback>
                    </Avatar>
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="fullName">
                    Enter your full name
                </Label>

                <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={fullName}
                    placeholder="Your name"
                    autoComplete="name"
                    onChange={handleOnchange}
                />
            </div>

            <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={!fullName.trim()}
            >
                Continue
            </Button>
        </form>
    );
}