export const ICONS = ['Download', 'Camera', 'Car', 'Hanger', 'Files', 'Envelope', 'Comments'] as const

export type IconKey = typeof ICONS[number]

export const ICON_PATHS: Record<IconKey, string> = {
    Download: '/icons/download.svg',
    Camera: '/icons/camera.svg',
    Car: '/icons/car.svg',
    Hanger: '/icons/hanger.svg',
    Files: '/icons/files.svg',
    Envelope: '/icons/envelope.svg',
    Comments: 'icons/comment.svg',
}