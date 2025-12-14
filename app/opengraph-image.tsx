import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'NextPro Blog - Share Your Ideas with the World'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'system-ui, sans-serif',
                    padding: '80px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        }}
                    >
                        NextPro Blog
                    </h1>
                    <p
                        style={{
                            fontSize: 36,
                            opacity: 0.95,
                            maxWidth: 800,
                            lineHeight: 1.4,
                        }}
                    >
                        Share Your Ideas with the World
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: 40,
                            gap: 20,
                            fontSize: 24,
                            opacity: 0.9,
                        }}
                    >
                        <span>✨ Real-time Collaboration</span>
                        <span>•</span>
                        <span>💬 Rich Comments</span>
                        <span>•</span>
                        <span>🎨 Beautiful Design</span>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
