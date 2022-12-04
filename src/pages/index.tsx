import {useEffect, useRef} from "react";

export default function Home() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef<boolean>(false);

    const startX = useRef<number>(0);
    const startY = useRef<number>(0);

    const endX = useRef<number>(0);
    const endY = useRef<number>(0);

    const handleMouseDown = (e: any) => {
        isDrawing.current = true;
        startY.current = e.clientY;
        startX.current = e.clientX;
    }

    const handleMouseUp = (e: any) => {
        endX.current = e.clientX;
        endY.current = e.clientY;
        isDrawing.current = false;
    }

    const handleMouseMove = (e: any) => {
        const ctx: any = canvas.current?.getContext("2d");

        if (isDrawing.current) {
            ctx.moveTo(startX.current, startY.current);
            ctx.lineTo(e.clientX, e.clientY);

            startY.current = e.clientY;
            startX.current = e.clientX;

            endX.current = e.clientX;
            endY.current = e.clientY;

            ctx.stroke();
        }
    }

    function handleResize() {
        if (!canvas.current) return;

        canvas.current.width = document.documentElement.clientWidth;
        canvas.current.height = document.documentElement.clientHeight;
    }

    useEffect(() => {
        handleResize();

        canvas.current?.addEventListener("mousedown", handleMouseDown);

        canvas.current?.addEventListener("mouseup", handleMouseUp);

        canvas.current?.addEventListener("mousemove", handleMouseMove);

        window.addEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <canvas width="500" height="500" ref={canvas}></canvas>
        </div>
    )
}
