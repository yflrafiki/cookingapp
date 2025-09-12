'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { X, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingStep {
  id: string;
  targetId: string;
  title: string;
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: 'input' | 'click';
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'name-input',
    targetId: 'name-input',
    title: "Let's get acquainted!",
    message: "Hi! What should we call you? I'd love to personalize your cooking experience.",
    position: 'bottom',
    action: 'input'
  },
  {
    id: 'culina-textarea',
    targetId: 'StartCulinar',
    title: "Meet Culina, your AI chef!",
    message: "Don't know what to cook? Tell Culina what you have in your pantry and it'll help you whip up something amazing!",
    position: 'bottom',
    action: 'input'
  },
  {
    id: 'find-recipe',
    targetId: 'find-recipe-card',
    title: "Browse our collection",
    message: "Explore our carefully curated collection of delicious recipes. From quick meals to gourmet dishes, we've got you covered!",
    position: 'top',
    action: 'click'
  },
  {
    id: 'cook-mode',
    targetId: 'cook-mode-card',
    title: "Experience voice-guided cooking",
    message: "Enter cook mode for a hands-free, voice-guided cooking experience. Perfect when your hands are busy!",
    position: 'top',
    action: 'click'
  },
  {
    id: 'my-recipes',
    targetId: 'my-recipes-card',
    title: "Manage your personal recipes",
    message: "Keep track of your favorite recipes, family traditions, and personal creations all in one place.",
    position: 'top',
    action: 'click'
  },
  {
    id: 'add-recipes',
    targetId: 'add-recipes-card',
    title: "Save your recipes",
    message: "Add your own recipes to the collection! Share your family secrets and cooking innovations with others.",
    position: 'top',
    action: 'click'
  }
];

export default function OnboardingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [userNameInput, setUserNameInput] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const { userName, setUserName, textSize, largeText } = useAppContext();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Check if onboarding should be shown
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
  };

  const handleNameSubmit = () => {
    if (userNameInput.trim()) {
      setUserName(userNameInput.trim());
      setIsNameSubmitted(true);
      setTimeout(() => {
        nextStep();
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentStep === 0) {
      handleNameSubmit();
    }
  };

  // Get text size class
  const getTextSizeClass = () => {
    if (largeText) {
      return 'text-lg';
    }
    switch (textSize) {
      case 33: return 'text-base';
      case 50: return 'text-lg';
      case 75: return 'text-xl';
      case 100: return 'text-2xl';
      default: return 'text-base';
    }
  };

  if (!isVisible) return null;

  const currentStepData = onboardingSteps[currentStep];
  const targetElement = document.getElementById(currentStepData.targetId);
  const targetRect = targetElement?.getBoundingClientRect();

  // Calculate overlay position and size
  const overlayStyle = targetRect ? {
    position: 'fixed' as const,
    top: targetRect.top - 8,
    left: targetRect.left - 8,
    width: targetRect.width + 16,
    height: targetRect.height + 16,
    zIndex: 1000,
  } : {};

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const tooltipOffset = 20;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    switch (currentStepData.position) {
      case 'top':
        return {
          top: targetRect.top - tooltipOffset,
          left: "50%",
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: targetRect.bottom + tooltipOffset,
          left: targetRect.left + targetRect.width / 2,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.left - tooltipOffset /2,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.right + tooltipOffset,
          transform: 'translate(0, -50%)'
        };
      default:
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[999] animate-in fade-in duration-300" />
      
      {/* Highlighted element */}
      {targetRect && (
        <div
          ref={overlayRef}
          className="absolute rounded-lg border-2 border-primary shadow-lg animate-in zoom-in-95 duration-300"
          style={overlayStyle}
        />
      )}

      {/* Tooltip */}
      <div
        className="fixed z-[1001] animate-in slide-in-from-bottom-2 duration-300"
        style={getTooltipPosition()}
      >
        <Card className="w-80 max-w-[90vw] shadow-xl border-primary/20">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className={cn("font-headline font-semibold text-foreground", getTextSizeClass())}>
                  {currentStepData.title}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={skipOnboarding}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className={cn("text-muted-foreground", getTextSizeClass())}>
                {currentStepData.message}
              </p>

              {/* Name input for first step */}
              {currentStep === 0 && !isNameSubmitted && (
                <div className="space-y-3">
                  <Input
                    value={userNameInput}
                    onChange={(e) => setUserNameInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your name..."
                    className={cn("w-full", getTextSizeClass())}
                    autoFocus
                  />
                  <Button
                    onClick={handleNameSubmit}
                    disabled={!userNameInput.trim()}
                    className="w-full"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between">

                <div className='flex flex-col items-center w-full'>


                      {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-5">
                    
                      <div className="flex gap-1">
                        {onboardingSteps.map((_, index) => (
                          <div
                            key={index}
                            className={cn(
                              "w-2 h-2 rounded-full transition-colors duration-200",
                              index === currentStep ? "bg-primary" : "bg-muted"
                            )}
                          />
                        ))}
                      </div>
                    
                    </div>

                {/* Navigation buttons */}
                <div className="flex flex-row items-center">
                  {currentStep > 0 && (
                    <Button
                      size="sm"
                      onClick={prevStep}
                      className='bg-secondary mx-[5px] rounded-[5px]'
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                  )}
                  
                  {currentStep === 0 && isNameSubmitted && (
                    <Button 
                    onClick={nextStep}
                    size="sm"
                    className='mx-[5px] rounded-[5px]'
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                  
                  {currentStep > 0 && (
                    <Button 
                    onClick={nextStep}
                    size="sm"
                    className='mx-[5px] rounded-[5px]'
                    >
                      {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>


                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
