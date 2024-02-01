import React, {useEffect, useState} from 'react';
import './Query.css';
import axios from "axios";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

function Query() {
    const {queryId} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm();

    function handleQuerySubmit(data) {
        console.log(data);
        updateQuery(data);
    }

    async function updateQuery(data) {
        try {
            const response = await axios.put(`http://localhost:8080/query/${queryId}`, data);
            console.log(response.data);
            // navigate('/login');
        } catch (e) {
            console.error(e);
        }
    }

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
    }, [queryId]);

    return (
        <div className="display-flex p-8 pl-10">
            {loading && <span>Loading...</span>}
            {error && <span>An error occurred while loading the data</span>}
            <h1 className="text-5xl font-bold text-gray-700 pb-10">Query page</h1>
            {data &&
                <form className="flex flex-col" onSubmit={handleSubmit(handleQuerySubmit(data))}>
                    <label className="text-xl" htmlFor="queryName">Name</label>
                    <input
                        type="text"
                        id="queryName"
                        className="text-3xl text-gray-700 p-2 border-2 rounded mb-2"
                        placeholder={data.name}
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Please provide a Query Name'
                            }
                        })}
                    />

                    <label className="text-xl" htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        className="text-3xl text-gray-700 p-2 border-2 rounded mb-2"
                        placeholder={data.description}
                        {...register("description")}
                    />

                    <div className="relative mb-3">
                        <label className="text-xl" htmlFor="queryName">Query</label>
                        <textarea
                            id="queryString"
                            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            rows="20"
                            placeholder={data.queryString}
                            {...register("queryString", {
                                required: {
                                    value: true,
                                    message: 'Please provide a Query String'
                                }
                            })}
                        ></textarea>
                    </div>
                    <button className="border-2" type="submit">
                        Update Query
                    </button>
                </form>
            }
        </div>
    );
}

export default Query;