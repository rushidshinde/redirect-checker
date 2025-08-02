import Checker from '@/components/custom/checker'
import UploadInstructions from "@/components/custom/uploadInstructions";

export default async function HomePage() {

  return (
    <div className="pb-20">
      <section className="w-full">
        <div className="container">
          <Checker/>
        </div>
      </section>
      <section className="w-full pt-20">
        <div className="container">
            <UploadInstructions/>
        </div>
      </section>
    </div>
  )
}
