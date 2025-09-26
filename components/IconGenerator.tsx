'use client'
import React, { use, useEffect, useMemo, useState } from 'react'
import { ICON_PATHS, IconKey, ICONS } from '@/utils/icons'

const sizes = [32, 48, 64, 128, 256]

export default function IconGenerator(){
    const [icon, setIcon] = useState<IconKey>(ICONS[0])
    const [color, setColor] = useState('#FFFFFF')
    const [size, setSize] = useState<number>(32)
    const [rawSvg, setRawSVG] = useState<string>('')

    // Fetch raw SVG file whnever icon changes
    useEffect(() => {
        fetch(ICON_PATHS[icon])
        .then(res => res.text())
        .then(svg => setRawSVG(svg))
        .catch(() => setRawSVG(''))
    }, [icon])


    // Inject color + size into SVG
    const svgString = useMemo(() => {
        if (!rawSvg) return ''

        let updated = rawSvg

        // remove existing width/height
        updated = updated.replace(/\s(width|height|fill|stroke)="[^"]*"/g, "")

        //set width/height
        updated = updated.replace(
            /<svg([^>]*)>/,
            `<svg$1 width="${size}" height="${size}" fill="${color}" stroke="${color}">`
        )

        // replace fill and stroke color inside
        updated = updated.replace(/fill="[^"]*"/g, `fill="${color}"`)
        updated = updated.replace(/stroke="[^"]*"/g, `stroke="${color}"`)

        return updated
    }, [rawSvg, color, size])

    function handleDownload() {
        if (!svgString) return 
        const blob = new Blob([svgString], { type: "image/svg+xml"})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${icon}-${size}.svg`
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    }

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>SVG Icon Generator</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='col-span-2'>
                    {/* Icon Selector */}
                    <label className='block text-sm font-medium mb-2'>Icon Type</label>
                    <select 
                        value={icon}
                        onChange={e => setIcon(e.target.value as IconKey)}
                        className='w-full p-2 rounded border'
                    >
                        {ICONS.map(key => (
                            <option key={key} value={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                        ))}
                    </select>

                    {/* Color Picker */}
                    <div className='mt-4'>
                        <label className='block text-sm font-medium mb-2'>Color</label>
                        <input
                            type='color'
                            value={color}
                            onChange={e => setColor(e.target.value)}
                            className='w-16 h-10 p-0 border rounded'>
                        </input>
                    </div>

                    {/* Size Selector */}
                    <div className='mt-4'>
                        <label className='block text-sm font-medium mb-2'>Size</label>
                        <select
                            value={size}
                            onChange={e => setSize(Number(e.target.value))}
                            className='w-32 p-2 rounded border'
                        >
                            {sizes.map( s => (
                                <option key={s} value={s}>
                                    {s}px
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Download Button */}
                    <div className='mt-6 flex gap-3'>
                        <button
                            onClick={handleDownload}
                            className='px-4 py-2 border rounded bg-sky-600 text-white hover:opacity-50'
                            disabled={!svgString}>
                                Download SVG
                        </button>
                        <button
                            onClick={() => svgString && navigator.clipboard?.writeText(svgString)}
                            className='px-4 py-2 border rounded hover:opacity-50'
                            disabled={!svgString}>
                                Copy SVG
                        </button>
                    </div>
                </div>

                {/* Preview */}
                <div className='flex flex-col item-center justify-center p-4'>
                    <div
                        className='bg-slate-100 p-4 rounded flex items-center justify-center'
                        style={{ maxWidth: 150, maxHeight: 150}}
                    >
                        <div
                            className='w-full h-full flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full'
                            dangerouslySetInnerHTML={{ __html: svgString}}
                        >
                        </div>
                    </div>
                        <p className='mt-3 text-sm text-slate-600'>Preview with {size}px</p>
                </div>
            </div>
        </div>
    )

}