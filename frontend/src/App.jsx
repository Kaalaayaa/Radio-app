import './App.css';

export default function App() {
    return (
        <div className="App">
            <h1>Select a city to listen to a local radio station</h1>
                <div class="select">
                <select name="format" id="format">
                    <option selected disabled>Choose a city</option>
                    <option value="wellington">Wellington</option>
                    <option value="fortdefrance">Fort-de France</option>
                    <option value="sansebastian">San Sebastián</option>
                </select>
</div>
        </div>
    )
}