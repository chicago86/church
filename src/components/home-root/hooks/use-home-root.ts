import React, { useState } from "react";
import { CacheConfig, FetchPolicy, Variables } from "relay-runtime";
import { getAuthenticated, get_p_tguid } from "../../../utils";

export interface QueryArgs {
  options?: {
    fetchKey?: number;
    fetchPolicy?: FetchPolicy | undefined;
    networkCacheConfig?: CacheConfig | undefined;
  } | undefined,
  variables: Variables
}

export interface HomeRoot {
  refetching: boolean;
  queryArgs?: QueryArgs;
}

export interface HomeRootState {
  homeRoot: HomeRoot;
  setHomeRoot: React.Dispatch<React.SetStateAction<HomeRoot>>;
}

export const useHomeRoot = (overrides?: Partial<HomeRoot>): HomeRootState => {
  const authenticated = localStorage.getItem("authenticated")?.toLowerCase() == 'true'

  const defaultHomeRoot: HomeRoot = {
    refetching: false,
    queryArgs:
    {
      options: { fetchKey: 0, fetchPolicy: "store-or-network" },
      variables: {
        authenticated: getAuthenticated(),
        p_tguid: get_p_tguid(),
        p_latitude: process.env.REACT_APP_DEFAULT_LATITUDE,
        p_longitude: process.env.REACT_APP_DEFAULT_LONGITUDE,
        p_distance_meters: Number(process.env.REACT_APP_DEFAULT_RADIUS_METERS),
        p_vacancy: undefined
      },
    },
  };

  const [homeRoot, setHomeRoot] = useState<HomeRoot>({
    ...defaultHomeRoot,
    ...overrides,
  });

  return { homeRoot, setHomeRoot };
};
