import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import classes from "../components/Pages/product.module.scss";
// IMPORTS
import Head from "next/head";
import Image from "next/image";
import SubmitButton from "../components/Layout/SubmitButton";
import ScanButton from "../components/Layout/ScanButton";
import axios from "axios";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { clearTheInput } from "../Redux/Reducers/layoutReducer";
// Notifications
import { toast } from "react-toastify";

function Product() {
    // router
    const router = useRouter();

    // Authentication Check
    useEffect(() => {
        // redirect if the authenticated is false
        const authenticated = document.cookie.split("=");
        if (!authenticated || authenticated[1] !== "true") {
            // redirect if Authentication is not true
            router.replace("/login");
        }
    }, [router]);

    //  init Redux
    const dispatch = useDispatch();
    const { code: ReduxCode } = useSelector((state) => state.layout);

    // State
    const [data, setData] = useState();
    const [imagePreview, setImagePreview] = useState();
    const [employeeList, setEmployeeList] = useState();
    const [locationsList, setLocationsList] = useState();

    // refs
    const locationRef = useRef();
    const inventoryRef = useRef();
    const employeeNumberRef = useRef();
    const assignFromDateRef = useRef();
    const quantityRef = useRef();
    const productImageRef = useRef();
    const productionLineRef = useRef();

    // Format the date to be able to set as a Default Value
    const Date_AssignFromDate = data && data[8] && new Date(data[8]);
    let day = Date_AssignFromDate && Date_AssignFromDate.getDate();
    // if the day is 1 chars make it 2
    if (day < 10) {
        day = `0${day}`;
    }
    let month = Date_AssignFromDate && Date_AssignFromDate.getMonth() + 1;
    // if the month is 1 chars make it 2
    if (month < 10) {
        month = `0${month}`;
    }
    const yaer = Date_AssignFromDate && Date_AssignFromDate.getFullYear();
    // make the date formate as the input default
    const formattedAssignFromDate = `${yaer}-${month}-${day}`;

    // Get the item Data Function from the server with it's code
    async function getTheData(searchCode) {
        axios
            .get(`${process.env.NEXT_PUBLIC_GET_ASSET}`, {
                params: {
                    assetNumber: searchCode,
                },
            })
            .then((res) => {
                console.log(res.data);
                // check if the data came
                if (res.data.success && res.data.asset) {
                    // Add the Array of Values in the state
                    setData(res.data.asset.rows[0]);
                }
                // return the response data
                return res.data;
            })
            .catch((err) => {
                // Check the message error
                let message = err.response?.data?.message
                    ? err.response.data.message
                    : err.message;

                // If the message has invalid identifier change the error message
                if (message.includes("invalid identifier")) {
                    message = "This code has no data";
                }
                // Notification
                toast.error(`${message} 😢`);
                // Check if Asset doesn't exist redirect to creatpage
                if (
                    message.includes("Asset does not exist!") ||
                    message.includes("This code has no data")
                ) {
                    // redirect to the create page
                    // router.push("/create");
                } else {
                    // if any another error redirect to scan page
                    router.push("/scan");
                }
            });
    }

    // GET THE EMPLOYEE LIST
    async function getTheEmployeeList() {
        await axios
            .get(`${process.env.NEXT_PUBLIC_GET_EMPLOYEES}`)
            .then((res) => {
                console.log(res.data);
                // check if the data is exist set it in the state
                if (res?.data?.employees?.rows) {
                    setEmployeeList(res.data.employees.rows);
                }
            })
            .catch((err) => {
                // Check the message error
                let message = err.response?.data?.message
                    ? err.response.data.message
                    : err.message;

                toast.error(`${message} 😢`);
            });
    }
    // GET THE LOCATIONS
    async function getTheLocations() {
        await axios
            .get(`${process.env.NEXT_PUBLIC_GET_LOCATIONS}`)
            .then((res) => {
                console.log(res.data);
                // check if the data is exist set it in the state
                if (res?.data?.locations?.rows) {
                    setLocationsList(res.data.locations.rows);
                }
            })
            .catch((err) => {
                // Check the message error
                let message = err.response?.data?.message
                    ? err.response.data.message
                    : err.message;

                toast.error(`${message} 😢`);
            });
    }

    // Get the Data
    useEffect(() => {
        // Code from url query
        const { code: queryCode } = router.query;
        // check if the code is exist in redux or query
        if (ReduxCode) {
            // get the data of item based on the code
            getTheData(ReduxCode);
            //  GET THE EMPLOYEE
            getTheEmployeeList();
            //  GET THE LOCATION
            getTheLocations();
        } else if (queryCode) {
            // get the data of item based on the code
            getTheData(queryCode);
            //  GET THE EMPLOYEE
            getTheEmployeeList();
            //  GET THE LOCATION
            getTheLocations();
        }
    }, [router, ReduxCode]);

    // Update The Data
    const UpdateHandler = (Asset_Number) => {
        // get the value from inputs and store in constants
        const locationValue = locationRef.current.value;
        const inventoryValue = inventoryRef.current.value;
        const employeeNumberValue = employeeNumberRef.current.value;
        const assignFromDateValue = assignFromDateRef.current.value;
        const quantityValue = quantityRef.current.value;
        const imageValue = productImageRef.current.files[0];
        const productionLineValue = productionLineRef.current.value;


        // Create a form data to send to the server
        const dataAsForm = new FormData();
        // Form data inputs
        dataAsForm.append("assetNumber", Asset_Number);
        dataAsForm.append("location", locationValue);
        dataAsForm.append("inventory", inventoryValue);
        dataAsForm.append("productionLine", productionLineValue);
        dataAsForm.append("employeeNumber", employeeNumberValue);
        dataAsForm.append("assignFromDate", assignFromDateValue);
        dataAsForm.append("quantity", quantityValue);
        dataAsForm.append("image", imageValue);

        // Send the update request to the server
        axios
            .put(`${process.env.NEXT_PUBLIC_UPDATE_ASSET}`, dataAsForm)
            .then((res) => {
                // Show a notification
                if (res?.data?.success && res?.data?.message) {
                    toast.success(`${res.data.message} ✨`);
                }

                // Show the transaction ID
                if (res?.data?.transactionId) {
                    toast.info(
                        `Your tansaction Id is: ${res.data.transactionId} ✨`
                    );
                }
                // Return res data
                return res.data;
            })
            .catch((err) => {
                if (err.response?.data?.message) {
                    // show an error message
                    toast.error(`${err.response.data.message} 😢`);
                } else {
                    // show an error message
                    toast.error(`${err.message} 😢`);
                }
            });
    };

    // Handle Image Change
    const imageChangedHandler = (e) => {
        e.preventDefault();

        // add a reader for reading the Image file
        const fileReader = new FileReader();

        fileReader.addEventListener("load", (event) => {
            setImagePreview(event.target.result);
        });

        const ImageForPreview = fileReader.readAsDataURL(
            productImageRef.current.files[0]
        );

        // Add the image to the state for preview
        setImagePreview(ImageForPreview);
    };

    // Initialize the Image url
    let ImageScr;
    // check if the srcs of the image to order the
    if (imagePreview) {
        ImageScr = imagePreview;
    } else if (data && data[10]) {
        ImageScr = data[10];
    } else {
        ImageScr = null;
    }

    // LogoutHandler
    const logoutHandler = () => {
        // clear the scan input
        dispatch(clearTheInput());
        // change the authenticated state at cookies
        document.cookie = `authenticated=false;`;
        // redirect to login
        router.replace("/login");
    };

    return (
        <>
            <Head>
                <title>Product</title>
                <meta
                    name={"description"}
                    content={`This Page is allowing you to check and update the product`}
                />
            </Head>
            <div className={classes.Product}>
                <div className={classes.Content}>
                    <section className={classes.Section_1}>
                        <div className={classes.Top}>
                            <div className={classes.LogoContainer}>
                                <div className={classes.Logo}>
                                    <Image
                                        src={"/Images/Logo.png"}
                                        width={237}
                                        height={60}
                                        alt={"Company logo"}
                                    />
                                </div>
                            </div>
                            <button
                                className={classes.LogOut}
                                onClick={logoutHandler}
                            >
                                <Image
                                    src={"/Icons/Logout.svg"}
                                    width={18}
                                    height={18}
                                    alt={"Logout Icon"}
                                />
                                Logout
                            </button>
                        </div>
                        <div className={classes.Bottom}>
                            <button
                                className={classes.Create}
                                onClick={() => router.push("/")}
                            >
                                <Image
                                    src={"/Icons/Home.svg"}
                                    width={30}
                                    height={30}
                                    alt={"Create Icon"}
                                />
                            </button>
                            <button
                                className={classes.Scan}
                                onClick={() => {
                                    dispatch(clearTheInput());
                                    router.push("/scan");
                                }}
                            >
                                <Image
                                    src={"/Icons/Scanner_Black.svg"}
                                    width={30}
                                    height={30}
                                    alt={"Scan Icon"}
                                />
                            </button>
                        </div>
                    </section>
                    <section className={classes.Section_2}>
                        <article className={classes.Admin_Item}>
                            <h2>Asset Number</h2>
                            <p>{data && data[0]}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Asset Name</h2>
                            <p>{data && data[1]}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Tag Number</h2>
                            <p></p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Asset Category</h2>
                            <p>{data && data[2]}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Serial</h2>
                            <p>{data && data[3]}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Plate Number</h2>
                            <p>{data && data[4]}</p>
                        </article>
                    </section>
                    <section className={classes.Section_3}>
                        <article className={classes.Product_Image}>
                            <label htmlFor='product_image'>
                                {ImageScr !== null ? (
                                    <Image
                                        src={ImageScr}
                                        width={600}
                                        height={300}
                                        alt={"product image"}
                                        objectFit={"cover"}
                                    />
                                ) : (
                                    "Choose an Image"
                                )}
                            </label>
                            <input
                                id='product_image'
                                type={"file"}
                                placeholder={"Enter Location"}
                                ref={productImageRef}
                                onChange={imageChangedHandler}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='employee'>Assign to employee</label>
                            <select id='employee' ref={employeeNumberRef}>
                                <option style={{ color: "#555" }}>
                                    Select an employee
                                </option>
                                {employeeList &&
                                    employeeList.map((item) => {
                                        return (
                                            <option
                                                key={item[0]}
                                                value={item[0]}
                                            >
                                                {item[1]}
                                            </option>
                                        );
                                    })}
                            </select>
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='location_select'>Location</label>
                            <select id={"location_select"} ref={locationRef}>
                                <option style={{ color: "#555" }}>
                                    Select a location
                                </option>
                                {locationsList &&
                                    locationsList.map((item) => {
                                        return (
                                            <option
                                                key={item[0]}
                                                value={item[0]}
                                            >
                                                {`${item[1]} - ${item[2]} - ${
                                                    item[3]
                                                } - ${item && item[4]}`}
                                            </option>
                                        );
                                    })}
                            </select>
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='inventory'>Inventory/Dept</label>
                            <input
                                id='inventory'
                                type={"text"}
                                placeholder={"Enter Inventory"}
                                defaultValue={data && data[6]}
                                ref={inventoryRef}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='Production_line'>
                                Production line
                            </label>
                            <input
                                id='Production_line'
                                type={"text"}
                                placeholder={"Enter Production line"}
                                ref={productionLineRef}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='AssignFromDate'>
                                Assign from Date
                            </label>
                            <input
                                id='AssignFromDate'
                                type={"date"}
                                placeholder={"Enter Assign from Date"}
                                defaultValue={formattedAssignFromDate}
                                ref={assignFromDateRef}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='LastTransactionDate'>
                                Last transaction Date
                            </label>
                            <input
                                id='LastTransactionDate'
                                type={"date"}
                                placeholder={"Enter Last transaction Date"}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='Quantity'>
                                Transaction Quantity
                            </label>
                            <input
                                id='Quantity'
                                type={"number"}
                                placeholder={"Enter Transaction Quantity"}
                                defaultValue={data && data[9]}
                                ref={quantityRef}
                            />
                        </article>
                        <div className={classes.BTN_Container}>
                            <ScanButton
                                submit_function={() => {
                                    dispatch(clearTheInput());
                                    router.push("/scan");
                                }}
                            />
                            <SubmitButton
                                buttonText={"Update"}
                                buttonFunction={(event) =>
                                    UpdateHandler(ReduxCode || data[0])
                                }
                            />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Product;
