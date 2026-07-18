import React, {lazy, Suspense} from "react";
import Loading from "../../containers/loading/Loading";

// lottie-react pulls in lottie-web (~250 kB). Loading it as a separate
// async chunk keeps it out of the main bundle.
const Lottie = lazy(() => import("lottie-react"));

export default function DisplayLottie({animationData}) {
  return (
    <Suspense fallback={<Loading />}>
      <Lottie animationData={animationData} loop={true} />
    </Suspense>
  );
}
