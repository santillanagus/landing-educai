"use client";

import {
  ElementType,
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { HTMLAttributes, ReactNode } from "react";

type GsapInstance = typeof import("gsap").gsap;
type GsapDelayedCall = ReturnType<GsapInstance["delayedCall"]>;

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 25,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 20,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps & HTMLAttributes<HTMLElement>) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const gsapRef = useRef<GsapInstance | null>(null);
  const delayedCallRef = useRef<GsapDelayedCall | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return "#ffffff";
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { gsap } = await import("gsap");
        if (!mounted) return;
        gsapRef.current = gsap;
        setGsapLoaded(true);
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.warn("GSAP not available:", error);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    return () => {
      if (delayedCallRef.current) {
        delayedCallRef.current.kill?.();
        delayedCallRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const gsapInstance = gsapRef.current;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode ? currentText.split("").reverse().join("") : currentText;

    const schedule = (callback: () => void, delayMs: number) => {
      if (delayedCallRef.current) {
        delayedCallRef.current.kill?.();
        delayedCallRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      const safeDelay = Math.max(delayMs, 0);

      if (gsapInstance) {
        delayedCallRef.current = gsapInstance.delayedCall(safeDelay / 1000, callback);
      } else {
        timeoutRef.current = window.setTimeout(callback, safeDelay) as unknown as ReturnType<typeof setTimeout>;
      }
    };

    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === "") {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }

          onSentenceComplete?.(textArray[currentTextIndex], currentTextIndex);
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
        } else {
          schedule(() => {
            setDisplayedText(prev => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          schedule(() => {
            setDisplayedText(prev => prev + processedText[currentCharIndex]);
            setCurrentCharIndex(prev => prev + 1);
          }, variableSpeed ? getRandomSpeed() : typingSpeed);
        } else if (textArray.length > 1) {
          schedule(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      schedule(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => {
      if (delayedCallRef.current) {
        delayedCallRef.current.kill?.();
        delayedCallRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
    gsapLoaded,
  ]);

  useEffect(() => {
    const gsapInstance = gsapRef.current;
    const element = containerRef.current?.querySelector<HTMLElement>(".text-type__content");
    if (!gsapInstance || !element) return;

    const ctx = gsapInstance.context(() => {
      gsapInstance.fromTo(
        element,
        { opacity: 0.9, y: 4 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out", overwrite: true }
      );
    }, containerRef);

    return () => ctx?.revert?.();
  }, [displayedText, gsapLoaded]);

  const shouldHideCursor =
    hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting);
  const cursorStyle = useMemo(
    () => ({ animationDuration: `${cursorBlinkDuration}s` }),
    [cursorBlinkDuration]
  );

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props,
    },
    <span className="text-type__content" style={{ color: getCurrentTextColor() }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        style={cursorStyle}
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? "text-type__cursor--hidden" : ""}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
