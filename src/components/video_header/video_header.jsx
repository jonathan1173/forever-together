import Video from '/src/assets/Italian_villa_terrace.mp4'

export default function VideoHeader() {
    return (
        <div className="flex justify-center">
            <section className="relative w-[400px]">

                <video src={Video} autoPlay loop muted className="w-full h-full block">
                    <source src={Video} type="video/mp4" />
                    Tu navegador no soporta videos.
                </video>

                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent from-60% to-white z-10"></div>

                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center z-20">
                    {/* Le agregamos text-6xl para que la fuente luzca bien en pantalla */}
                    <h1 className="font-italics text-5xl text-neutral-800">Romeo y Julieta</h1>
                    {/* Aquí puedes usar font-letter si quieres que el texto de abajo use la otra fuente */}
                    <p className="font-letter text-xl uppercase tracking-wider text-neutral-600 mt-2">
                        are getting married!
                    </p>
                </div>
            </section>
        </div>
    )
}