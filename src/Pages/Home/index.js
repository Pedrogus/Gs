import './style.css';



const Home = () => {

  return (

    <>

<div className="home-container">
            <header className="home-header">
                <h1>Bem-vindo à Viagem Sustentável</h1>
                <p>
                    Incentivamos o uso de transportes ecológicos para uma mobilidade urbana sustentável e um futuro melhor.
                </p>
            </header>

            {/* Seção do vídeo */}
            <section className="home-video-section">
                <h2>Conheça a Ideia do Projeto</h2>
                <div className="video-container">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/SEU_VIDEO_ID"
                        title="Vídeo explicativo sobre Viagem Sustentável"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>

            {/* Informações sobre o projeto */}
            <section className="home-project-info">
                <h2>Ideia do Projeto</h2>
                <p>
                    A Viagem Sustentável visa incentivar a adoção de modos de transporte ecológicos, como bicicletas, 
                    scooters elétricas e ônibus, para melhorar a mobilidade urbana de maneira responsável e sem agredir 
                    o meio ambiente. 
                </p>
                <p>
                    A cada viagem realizada, o usuário acumula pontos de viagem que podem ser trocados por benefícios, 
                    como descontos em viagens, vantagens exclusivas ou até mesmo mais pontos.
                </p>
            </section>
        </div>
    </>
  );
};

export default Home;

