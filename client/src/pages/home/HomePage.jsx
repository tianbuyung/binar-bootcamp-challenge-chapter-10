import Banner from './components/banner'
import Button from '../../components/button'
const HomePage = () => {
    return (
        <div>
            Ini Home Page

            {/* example manggil banner khusus component */}
            <Banner />

            {/* Example manggil component yang reusable */}

            <Button title="ini button" />
        </div>
    )
}

export default HomePage;