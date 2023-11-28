'use client'

import capitalizeFirstLetter from "@/utils/use-capitalize"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface ActionTooltipProps {
    label: string,
    children: React.ReactNode,
    side?: "top" | "right" | "bottom" | "left",
    align?: "start" | "center" | "end"
}

import React from 'react'

export default function ActionTooltip({label, children, side, align}: ActionTooltipProps) {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align}>
                <p className="font-semibold text-sm capi">
                    {capitalizeFirstLetter(label)}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}
