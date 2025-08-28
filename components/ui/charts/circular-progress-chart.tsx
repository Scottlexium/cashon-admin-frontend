'use client';

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface CircularProgressChartProps {
    totalValue: number;
    currency?: string;
    locale?: string;
    segments: Array<{
        label: string;
        value: number;
        color: string | { from: string; to: string; direction?: 'horizontal' | 'vertical' | 'diagonal' };
        percentage: number;
    }>;
    className?: string;
    // Size customization props
    width?: number;
    height?: number;
    radius?: number;
    strokeWidth?: number;
    // Spacing and arc props
    segmentSpacing?: number;
    showInnerArc?: boolean;
    innerArcOffset?: number;
    innerArcStrokeWidth?: number;
    innerArcOpacity?: number;
    outerArcStrokeWidth?: number;
    outerArcOpacity?: number;
}

export function CircularProgressChart({
    totalValue,
    currency = 'NGN',
    locale = 'en-NG',
    segments,
    className = '',
    // Size props with defaults
    width = 400,
    height = 250,
    radius = 80,
    strokeWidth = 8,
    // Spacing and arc props
    segmentSpacing = 0.08,
    showInnerArc = true,
    innerArcOffset = 1.2,
    innerArcStrokeWidth = 1.5,
    innerArcOpacity = 0.8,
    outerArcStrokeWidth = 2,
    outerArcOpacity = 0.4
}: CircularProgressChartProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous render

        const centerX = width / 2;
        const centerY = height * 0.65; // Position arc higher up for race track look

        const chartGroup = svg
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .append('g')
            .attr('transform', `translate(${centerX}, ${centerY})`);

        // Create gradient for race track background
        const defs = svg.append('defs');
        const gradient = defs.append('linearGradient')
            .attr('id', 'raceTrackGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');

        gradient.append('stop')
            .attr('offset', '10%')
            .attr('stop-color', 'white')
            .attr('stop-opacity', 0);

        gradient.append('stop')
            .attr('offset', '26%')
            .attr('stop-color', 'white')
            .attr('stop-opacity', 0.09);

        gradient.append('stop')
            .attr('offset', '59%')
            .attr('stop-color', 'white')
            .attr('stop-opacity', 0);

        // Create gradients for segments
        segments.forEach((segment, index) => {
            if (typeof segment.color === 'object') {
                const gradientId = `segmentGradient${index}`;
                const segmentGradient = defs.append('linearGradient')
                    .attr('id', gradientId);

                // Set gradient direction
                if (segment.color.direction === 'vertical') {
                    segmentGradient.attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
                } else if (segment.color.direction === 'diagonal') {
                    segmentGradient.attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%');
                } else { // horizontal (default)
                    segmentGradient.attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '0%');
                }

                segmentGradient.append('stop')
                    .attr('offset', '0%')
                    .attr('stop-color', segment.color.from);

                segmentGradient.append('stop')
                    .attr('offset', '100%')
                    .attr('stop-color', segment.color.to);
            }
        });

        // Add the race track background (270° arc)
        const backgroundArc = d3.arc()
            .innerRadius(radius)
            .outerRadius(radius)
            .startAngle(-Math.PI * 0.75) // Start from bottom-left
            .endAngle(Math.PI * 0.75)    // End at bottom-right (270° arc)
            .cornerRadius(0);

        chartGroup
            .append('path')
            .attr('d', backgroundArc as any)
            .attr('fill', 'none')
            .attr('stroke', 'url(#raceTrackGradient)')
            .attr('strokeWidth', outerArcStrokeWidth)
            .attr('opacity', outerArcOpacity);

        // Create pie generator for the data segments (270° arc)
        const pie = d3.pie<any>()
            .value(d => d.value)
            .startAngle(-Math.PI * 0.75)
            .endAngle(Math.PI * 0.75)
            .padAngle(segmentSpacing) // Customizable gap between segments
            .sort(null);

        // Create arc generator for strokes (not filled)
        const arc = d3.arc()
            .innerRadius(radius)
            .outerRadius(radius)
            .cornerRadius(strokeWidth / 3); // Better proportion for rounded corners

        const pieData = pie(segments);

        // Create the colored segments as strokes
        chartGroup
            .selectAll('path.segment')
            .data(pieData)
            .enter()
            .append('path')
            .attr('class', 'segment')
            .attr('d', arc as any)
            .attr('fill', 'none') // No fill - just stroke
            .attr('stroke', (d, i) => {
                const segment = d.data;
                if (typeof segment.color === 'object') {
                    return `url(#segmentGradient${i})`;
                }
                return segment.color;
            })
            .attr('strokeWidth', strokeWidth)
            .attr('strokeLinecap', 'round') // Rounded endpoints
            .attr('strokeLinejoin', 'round') // Rounded joins
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 200)
            .style('opacity', 1)
            .attrTween('d', function (d: any) {
                const interpolate = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d);
                return function (t: number) {
                    return arc(interpolate(t)) as string;
                };
            });

        // Add inner track arc AFTER segments (so it renders on top)
        if (showInnerArc) {
            const innerTrackArc = d3.arc()
                .innerRadius(radius - strokeWidth * innerArcOffset)
                .outerRadius(radius - strokeWidth * innerArcOffset)
                .startAngle(-Math.PI * 0.75)
                .endAngle(Math.PI * 0.75)
                .cornerRadius(0);

            chartGroup
                .append('path')
                .attr('d', innerTrackArc as any)
                .attr('fill', 'none')
                .attr('stroke', '#404045') // Subtle gray inner track
                .attr('strokeWidth', innerArcStrokeWidth)
                .attr('strokeLinecap', 'round')
                .attr('opacity', innerArcOpacity);
        }

    }, [segments, width, height, radius, strokeWidth, totalValue, currency, locale, segmentSpacing, showInnerArc, innerArcOffset, innerArcStrokeWidth, innerArcOpacity, outerArcStrokeWidth, outerArcOpacity]);

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {/* Chart */}
            <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
                <svg
                    ref={svgRef}
                    width={width}
                    height={height}
                    className="overflow-visible relative z-10"
                ></svg>

                {/* Center Content */}
                <div
                    className="absolute flex flex-col items-center justify-center z-20"
                    style={{
                        left: `${width / 2}px`,
                        top: `${height * 0.65}px`,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <p className="text-xs text-[#8C8C93] mb-1 tracking-wider uppercase">Total Revenue</p>
                    <p className="text-2xl sm:text-3xl font-bold text-[#DEDEE3]">
                        {formatCurrency(totalValue)}
                    </p>
                </div>
            </div>

            {/* Grid Image - Separate section */}
            <div className="-mt-15 w-full">
                <div
                    className="bg-contain bg-center bg-no-repeat w-full"
                    style={{
                        backgroundImage: 'url(/chart-grid.svg)',
                        height: "90px",
                        // width: `${radius * 1.8}px`,
                        // height: `${radius * 0.7}px`,
                        // filter: 'brightness(0.6)'
                    }}
                ></div>
            </div>

            {/* Labels Grid */}
            <div className="grid grid-cols-3 gap-8 w-full max-w-md -mt-10">
                {segments.map((segment, index) => (
                    <div key={index} className="text-left">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div
                                className="w-1 h-8 rounded-full"
                                style={{
                                    background: typeof segment.color === 'object'
                                        ? `linear-gradient(${segment.color.direction === 'vertical' ? 'to bottom' :
                                            segment.color.direction === 'diagonal' ? 'to bottom right' :
                                                'to right'
                                        }, ${segment.color.from}, ${segment.color.to})`
                                        : segment.color
                                }}
                            ></div>
                            <div>
                                <p className="text-xs text-[#8C8C93]">{segment.label}</p>
                                <p className="text-sm font-bold text-[#DEDEE3]">
                                    {segment.value.toLocaleString()}
                                </p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}