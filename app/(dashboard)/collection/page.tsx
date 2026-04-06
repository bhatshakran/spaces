import { CollectionView } from "@/features/collection/components/CollectionView";
import { Suspense } from "react";

export default function CollectionPage() {
  return (
    <Suspense fallback={null}>
      <CollectionView />
    </Suspense>
  );
}
