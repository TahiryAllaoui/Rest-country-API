import '../style/Country.scss';
import { CiSearch } from 'react-icons/ci'

function Country() {

    return (
        <div className='country'>
            <form>
                <div className="text-area">
                    <CiSearch className='test' />
                    <input type="text" placeholder='Search for a country...' />
                </div>
                <div className="select">
                    Filter by Region
                </div>
            </form>
        </div>
    )
}

export default Country