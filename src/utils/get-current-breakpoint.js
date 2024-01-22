export function getCurrentBreakpoint() {
    const TABLET = 768
    const DESKTOP = 1024
    const windowWidth = window.innerWidth
    const breakpoint = windowWidth >= DESKTOP ?
        'desktop'
        : windowWidth < DESKTOP && windowWidth >= TABLET ?
            'tablet'
            : 'smartphone'
    return breakpoint
}