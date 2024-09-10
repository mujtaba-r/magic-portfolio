const baseURL = 'www.mujtabahassanrizvi.com'

const routes = {
    '/':        true,
    '/about':   true,
    '/work':    false,
    '/blog':    true,
    '/gallery': true,
}

// Enable password protection on selected routes
// Set password in pages/api/authenticate.ts
const protectedRoutes = {
    
}

const effects = {
    gradient: false,
    dots:     false,
    lines:    true,
}

const style = {
    theme:       'dark',         // dark | light
    neutral:     'slate',        // sand | gray | slate
    brand:       'indigo',       // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    accent:      'violet',         // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
    solid:       'contrast',        // color | contrast
    solidStyle:  'flat',         // flat | plastic
    border:      'conservative',      // rounded | playful | conservative
    surface:     'translucent',       // filled | translucent
    transition:  'all'           // all | micro | macro
}

const display = {
    location: true,
    time:     true
}

const mailchimp = {
    action: 'https://url/subscribe/post?parameters',
    effects: {
        gradient: true,
        dots:     false,
        lines:    false,
    }
}

export { routes, protectedRoutes, effects, style, display, mailchimp, baseURL };