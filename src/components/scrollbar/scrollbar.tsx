import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "@emotion/styled";
import { styles } from "../../constants/style";

interface ScrollbarProps {
  children: React.ReactNode;
  bgColor?: string;
  showScrollByDefault?: boolean;
}

interface ScrollThumbProps {
  bgColor?: string;
  height: string;
}

interface ScrollBarProps {
  display: string;
}

const ScrollContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const ScrollContent = styled.div`
  height: 100%;
  -ms-overflow-style: none;
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollBar = styled.div<ScrollBarProps>`
  display: ${(props) => props.display};
  position: absolute;
  height: 100%;
  right: 8px;
  top: 0;
`;

const ScrollThumb = styled.div<ScrollThumbProps>`
  border-radius: 4px;
  background-color: ${(props) => props.bgColor ?? styles.scrollDefault};
  height: ${(props) => props.height};
  position: absolute;
  width: 4px;
`;

export const Scrollbar = ({
  children,
  bgColor,
  showScrollByDefault = true,
}: ScrollbarProps) => {
  let scrollTimer = -1;
  const [toggleVisibility, setToggleVisibility] = useState(showScrollByDefault);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [scrollStartPosition, setScrollStartPosition] = useState<number>(0);
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  function handleResize(ref: HTMLDivElement) {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * clientHeight, 5));
  }

  const handleThumbPosition = useCallback(() => {
    if (!contentRef.current || !scrollThumbRef.current) {
      return;
    }

    if (scrollTimer !== -1) {
      clearTimeout(scrollTimer);
    }

    setToggleVisibility(true);
    const {
      scrollTop: contentTop,
      scrollHeight: contentHeight,
      clientHeight: trackHeight,
    } = contentRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
    scrollTimer = window.setTimeout(() => {
      if (!showScrollByDefault) setToggleVisibility(false);
    }, 300);
  }, []);

  const handleThumbMousedown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientY);
    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
    setIsDragging(true);
  }, []);

  const handleThumbMouseup = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const handleThumbMousemove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        const contentScrollHeight = contentRef.current?.scrollHeight as number;
        const contentOffsetHeight = contentRef.current?.offsetHeight as number;
        const deltaY =
          (e.clientY - scrollStartPosition) *
          (contentOffsetHeight / thumbHeight);
        const newScrollTop = Math.min(
          initialScrollTop + deltaY,
          contentScrollHeight - contentOffsetHeight
        );

        if (contentRef.current) contentRef.current.scrollTop = newScrollTop;
      }
    },
    [isDragging, scrollStartPosition, thumbHeight]
  );

  useEffect(() => {
    if (contentRef.current) {
      const ref = contentRef.current;
      observer.current = new ResizeObserver(() => {
        handleResize(ref);
      });
      observer.current.observe(ref);
      ref.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleThumbMousemove);
    document.addEventListener("mouseup", handleThumbMouseup);
    document.addEventListener("mouseleave", handleThumbMouseup);
    return () => {
      document.removeEventListener("mousemove", handleThumbMousemove);
      document.removeEventListener("mouseup", handleThumbMouseup);
      document.removeEventListener("mouseleave", handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  useEffect(() => {
    if (contentRef.current) handleResize(contentRef.current);
  }, [contentRef.current?.scrollHeight]);
  const scrollRequired =
    contentRef.current &&
    contentRef.current?.scrollHeight > contentRef.current?.clientHeight;

  return (
    <ScrollContainer>
      <ScrollContent ref={contentRef}>{children}</ScrollContent>
      <ScrollBar
        display={toggleVisibility && scrollRequired ? "block" : "none"}
      >
        <ScrollThumb
          ref={scrollThumbRef}
          onMouseDown={handleThumbMousedown}
          height={`${thumbHeight}px`}
          bgColor={bgColor}
        ></ScrollThumb>
      </ScrollBar>
    </ScrollContainer>
  );
};
