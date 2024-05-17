import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {

    const users = [{
            userName: "midudev",
            name: "Miguel Ángel Durán",
            isFollowing: true
        },
        {
            userName: "pheralb",
            name: "Pablo Hernández",
            isFollowing: false
        },
        {
            userName: "vxnder",
            name: "Vexnder",
            isFollowing: false
        }
    ]

    return (
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) => (
                    <TwitterFollowCard 
                    key={userName}
                    userName={userName}
                    initialIsFollowing={isFollowing}>
                        {name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}