import React from "react";
import classes from "../components/Pages/product.module.scss";
// IMPORTS
import Head from "next/head";
import Image from "next/image";
import SubmitButton from "../components/Layout/SubmitButton";

function product() {
    const DUMMY = {
        AssetNumber: 350,
        AssetName: "Lenovo Legion7 530p",
        TagNumber: 5248536521,
        AssetCategory: "Laptop",
        Serial: "E52365S896",
        PlateNumber: 53,
    };

    return (
        <>
            <Head>
                <title>{DUMMY.AssetName}</title>
            </Head>
            <div className={classes.Product}>
                <div className={classes.Content}>
                    <section className={classes.Section_1}>
                        <div className={classes.Top}>
                            <div className={classes.LogoContainer}>
                                <div className={classes.Logo}>
                                    <Image
                                        src={"/Images/Logo.png"}
                                        layout={"fill"}
                                        alt={"Company logo"}
                                    />
                                </div>
                            </div>
                            <button className={classes.LogOut}>
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
                            <button className={classes.Create}>
                                <Image
                                    src={"/Icons/Create.svg"}
                                    width={30}
                                    height={30}
                                    alt={"Create Icon"}
                                />
                            </button>
                            <button className={classes.Scan}>
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
                            <p>{DUMMY.AssetNumber}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Asset Name</h2>
                            <p>{DUMMY.AssetName}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Tag Number</h2>
                            <p>{DUMMY.TagNumber}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Asset Category</h2>
                            <p>{DUMMY.AssetCategory}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Serial</h2>
                            <p>{DUMMY.Serial}</p>
                        </article>
                        <article className={classes.Admin_Item}>
                            <h2>Plate Number</h2>
                            <p>{DUMMY.PlateNumber}</p>
                        </article>
                    </section>
                    <section className={classes.Section_3}>
                        <article className={classes.User_Item}>
                            <label htmlFor='location'>Location</label>
                            <input
                                id='location'
                                type={"text"}
                                placeholder={"Enter Location"}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='inventory'>Inventory</label>
                            <input
                                id='inventory'
                                type={"text"}
                                placeholder={"Enter Inventory"}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='employee'>Assign to employee</label>
                            <input
                                id='employee'
                                type={"text"}
                                placeholder={"Enter Employee"}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='AssignFromDate'>
                                Assign from Date
                            </label>
                            <input
                                id='AssignFromDate'
                                type={"text"}
                                placeholder={"Enter Assign from Date"}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='LastTransactionDate'>
                                Last transaction Date
                            </label>
                            <input
                                id='LastTransactionDate'
                                type={"text"}
                                placeholder={"Enter Last transaction Date"}
                            />
                        </article>
                        <article className={classes.User_Item}>
                            <label htmlFor='Quantity'>
                                Transaction Quantity
                            </label>
                            <input
                                id='Quantity'
                                type={"text"}
                                placeholder={"Enter Transaction Quantity"}
                            />
                        </article>
                        <div className={classes.BTN_Container}>
                            <SubmitButton
                                buttonText={"Update"}
                                buttonFunction={() => {}}
                            />
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}

export default product;