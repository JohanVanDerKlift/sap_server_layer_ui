import React, {useEffect, useState} from 'react';
import './Queries.css';
import axios from "axios";
import {Link} from "react-router-dom";

function Queries(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get("http://localhost:8080/query");
                console.log(response.data);
                setData(response.data);
            } catch (e) {
                console.error(e);
                setError(true);
            }
            setLoading(false);
        }

        void fetchData();
    }, []);

    return (
        <div className="display-flex p-8 pl-10">
            <h1 className="text-5xl font-bold text-gray-700 pb-10">Queries page</h1>
            {loading && <span>Loading...</span>}
            {error && <span>An error occurred while loading the data</span>}
            {data &&
                <div>
                    <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full text-left text-2xl font-light">
                                        <thead
                                            class="border-b bg-white font-medium text-gray-700">
                                        <tr>
                                            <th scope="col" class="px-6 py-4">Name</th>
                                            <th scope="col" class="px-6 py-4">Description</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.map((query) => {
                                            return (
                                                <tr className="text-gray-700 odd:bg-gray-100">
                                                    <td className="p-3 text-xl"><Link to={`/query/${query.id}`}>{query.name}</Link></td>
                                                    <td className="p-3 text-xl">{query.description}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Queries;