import React from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";

function NewQuery(props) {
    const {register, handleSubmit, formState: {errors}} = useForm();

    function handleQuerySubmit(data) {
        console.log(data);
        saveQuery(data);
    }

    async function saveQuery(data) {
        try {
            const response = await axios.post('http://localhost:8080/query', data);
            console.log(response.data);
            // navigate('/login');
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="display-flex p-8 pl-10">
            {/*{loading && <span>Loading...</span>}*/}
            {/*{error && <span>An error occurred while loading the data</span>}*/}
            {/*<h1 className="text-5xl font-bold text-gray-700 pb-10">Query page</h1>*/}
            {/*{data &&*/}
            <form className="flex flex-col" onSubmit={handleSubmit(handleQuerySubmit)}>
                <label className="text-xl" htmlFor="queryName">Name</label>
                <input
                    type="text"
                    id="queryName"
                    className="text-3xl text-gray-700 p-2 border-2 rounded mb-2"
                    placeholder="Query Name..."
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
                    placeholder="Description..."
                    {...register("description")}
                />

                <div className="relative mb-3">
                    <label className="text-xl" htmlFor="queryName">Query</label>
                    <textarea
                        id="queryString"
                        className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        rows="20"
                        {...register("queryString", {
                            required: {
                                value: true,
                                message: 'Please provide a Query String'
                            }
                        })}
                    ></textarea>
                </div>
                <button className="border-2" type="submit">
                    Save Query
                </button>
            </form>
            {/*}*/}
        </div>
    );
}

export default NewQuery;