import { useState, useEffect } from 'react'
import { X, ArrowRight, CheckCircle } from 'lucide-react'

interface OnboardingStep {
  title: string
  description: string
  highlight?: string
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to Writing Defense Platform',
    description: 'This tool helps L2 writers protect their authentic voice from AI detection bias. Let\'s get started with a quick tour.',
  },
  {
    title: 'Step 1: Create Your Baseline',
    description: 'Upload 2-3 of your previous essays to establish your unique writing fingerprint. This helps the system understand YOUR authentic voice.',
    highlight: 'baseline'
  },
  {
    title: 'Step 2: Upload Research Sources',
    description: 'Add your research materials to enable plagiarism detection and ensure independent synthesis.',
    highlight: 'sources'
  },
  {
    title: 'Step 3: Start Writing',
    description: 'Write naturally in the editor. The system tracks your keystroke patterns and provides real-time feedback.',
    highlight: 'editor'
  },
  {
    title: 'Understanding Metrics',
    description: 'Humanity Score shows how human-like your writing patterns are. Higher scores (70-100) indicate authentic, human writing.',
  },
  {
    title: 'Shadow System',
    description: 'See how AI detectors might score your work. Low risk (green) means your authentic voice is strong!',
  }
]

interface OnboardingTutorialProps {
  onComplete: () => void
}

export default function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial')
    if (!hasSeenTutorial) {
      setShow(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = () => {
    localStorage.setItem('hasSeenTutorial', 'true')
    setShow(false)
    onComplete()
  }

  if (!show) return null

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-2xl w-full p-6 relative">
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-1 hover:bg-gray-700 rounded"
          aria-label="Close tutorial"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleSkip}
              className="text-sm text-gray-400 hover:text-gray-300"
            >
              Skip tutorial
            </button>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            {currentStep === steps.length - 1 && (
              <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
            )}
            {step.title}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep
                    ? 'bg-primary-500'
                    : index < currentStep
                    ? 'bg-primary-700'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tip */}
        <div className="mt-6 p-3 bg-blue-900/20 border border-blue-800/50 rounded text-sm text-blue-200">
          💡 <strong>Tip:</strong> You can restart this tutorial anytime from the settings menu.
        </div>
      </div>
    </div>
  )
}
