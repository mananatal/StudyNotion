import {toast} from "react-hot-toast"
import { catalogData } from '../apis';
import { apiConnector } from "../apiConnector";

export const getCatalogaPageData = async(categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
        {categoryId: categoryId,});

        if(!response?.data?.success)
            throw new Error("Could not Fetch Category page data");

         result = response?.data;

  }
  catch(error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);

    result = error.response?.data;
  }
  toast.dismiss(toastId);
  return result;
}

