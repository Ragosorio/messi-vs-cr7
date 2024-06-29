import { useState, useEffect } from 'preact/hooks';

interface VoteSystemProps {
    name: string;
    email: string;
}

export function VoteSystem({ name, email }: VoteSystemProps) {
    const [voted, setVoted] = useState<string | null>(null);
    const [info, setInfo] = useState();

    useEffect(() => {
        const savedVote = localStorage.getItem('votedCandidate');
        if (savedVote) {
            setVoted(savedVote);
        }
    }, []);

    useEffect(() => {
        if (voted) {
            if (localStorage.getItem("voto")) {
                return
            } else{
                console.log("Se envio")
                localStorage.setItem('voto', "true");
                async function postVotes() {
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email, vote: voted }) 
                    };
                
                    try {
                        const response = await fetch('/api/vote?name=${name}&email=${email}&vote=${voted}', requestOptions);
                        const data = await response.json();
                        setInfo(data);
                        console.log(info);
                    } catch (error) {
                        console.error('Error al enviar la solicitud:', error);
                    }
                }
                
                postVotes();
            }
        }
      }, [voted]);

    const handleVote = (candidate: string) => {
        if (!voted) {
            setVoted(candidate);
            localStorage.setItem('votedCandidate', candidate);
        }
    };

    const btnss = (
        <>
            <Button 
                onClick={() => handleVote('Messi')} 
                disabled={voted !== null}
            >
                Messi
            </Button>
            <Button 
                onClick={() => handleVote('Ronaldo')} 
                disabled={voted !== null}
            >
                Ronaldo
            </Button>
        </>
    );

    const text = (
        <div class="flex flex-col justify-center items-center mt-12">
            <p class="text-white/80 text-center text-lg z-50">
                Votaste por: <br /> {voted}
            </p>
            <br />
            <p class="text-fuchsia-500/90 text-xs text-pretty z-50 text-center bg-white/10 p-4">
                Revisa mi ig <a class="text-fuchsia-500 underline" href="https://instagram.com/ragosorio">@ragosorio</a>
                <br />para ver los resultados <br />el 3 de Julio
            </p>
        </div>
    );

    return (
        <>
            {voted ? text : btnss}
        </>
    );
}

interface ButtonProps {
    children: string;
    onClick: () => void;
    disabled: boolean;
}

export function Button({ children, onClick, disabled }: ButtonProps) {
    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 mx-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {children}
            </span>
        </button>
    );
}