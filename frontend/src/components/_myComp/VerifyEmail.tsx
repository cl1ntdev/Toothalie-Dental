import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { IconMailOpened } from '@tabler/icons-react'; // Using Tabler Icons

function VerifyEmailModal({ isOpen, onClose }) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleCloseAndRedirect = () => {
        if (onClose) onClose();
        navigate('/login');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm font-ceramon transition-all">
            
            {/* The Modal Card */}
            <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-8 text-center shadow-lg text-card-foreground animate-in fade-in zoom-in-95 duration-200">
                
                {/* Icon Wrapper */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <IconMailOpened className="h-8 w-8 text-primary" stroke={1.5} />
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Check your email</h2>
                    <p className="text-sm text-muted-foreground text-balance">
                        We've sent a verification link to your email address. Please check your inbox and click the link to verify your Toothalie account.
                    </p>
                </div>

                {/* Action Button */}
                <div className="pt-4 space-y-3">
                    <Button
                        variant="default"
                        className="w-full"
                        onClick={handleCloseAndRedirect}
                    >
                        Back to Login
                    </Button>
                </div>
                
                
            </div>
        </div>
    );
}

export default VerifyEmailModal;