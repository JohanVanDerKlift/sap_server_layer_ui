import React, {useEffect, useState} from 'react';
import './Query.css';
import axios from "axios";
import {useParams} from "react-router-dom";

function Query() {
    const {queryId} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`http://localhost:8080/query/${queryId}`);
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
            {loading && <span>Loading...</span>}
            {error && <span>An error occurred while loading the data</span>}
            <h1 className="text-5xl font-bold text-gray-700 pb-10">Query page</h1>
            {data &&
                <div>
                    <h2 className="text-3xl text-gray-700 pb-5">{data.name}</h2>
                    <input className="text-3xl text-gray-700 pb-5" value={data.description}/>
                    <div class="relative mb-3" data-te-input-wrapper-init>
                    <textarea
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        rows="20" value={data.queryString}></textarea>
                    </div>
                </div>
            }
        </div>
    );
}

export default Query;