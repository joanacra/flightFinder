import "./App.css";
import SearchForm from "./components/SearchForm";

function App() {
    return (
        <div>
            <div className="navBar">
                <div className="title">Flight Finder</div>
                <div>
                    <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M41.6933 7.16832C42.775 8.24999 42.775 9.99165 41.6933 11.055L34.5617 18.1867L38.4483 35.035L35.8633 37.6383L28.75 24.0167L21.6 31.1667L22.26 35.695L20.2983 37.6383L17.0717 31.8083L11.2233 28.5633L13.1667 26.5833L17.75 27.2617L24.845 20.1667L11.2233 12.9983L13.8267 10.4133L30.675 14.3L37.8067 7.16832C38.8333 6.10499 40.6667 6.10499 41.6933 7.16832Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </div>
            <SearchForm />
        </div>
    );
}

export default App;
