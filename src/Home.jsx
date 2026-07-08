
import { AIChatBot } from './Page/AIChatBot'
import { Detailss } from './Page/Details'

export const Home = () => {
    return (
        <>
            <div className="grid lg:grid-cols-2 ">
                <div className="lg:col-span-1 p-5">
                    <Detailss />
                </div>
                <div className="lg:col-span-1 p-5">
                    <AIChatBot />
                </div>

            </div>
        </>
    )
}
