import type { NextPage } from "next"

const description = `
We are honored to create a meaningful and personal piece of art for as a gift, or for your home or office. 

We offer: 

Landscapes/Seasonal scenes
Portraits (people and pets)
Custom artwork for home interiors and professional spaces (offices, lobbies, restaurants, model home, or staging)


Commission Process
1. Consultation
2. Proposal – I will recommend a composition idea, timeline, and price.
3. Agreement: A 30–50% non-refundable deposit is required to secure the project. 
4. Final delivery and payment – The remaining balance is due upon completion before delivery or shipping.

Delivery/Shipping – Local delivery may be available. Shipping costs will be calculated based on size and location.

Framing
Currently, all paintings are sold unframed unless framing is specifically requested. Framing costs will be added to the final price if requested. 

I want you to be happy with the painting you receive, and I will work with you to ensure the painting fits your space and vision.

Please contact us at info@twinarts.studio. 
`

const Commissions: NextPage = () => {
  return (
    <div className="flex h-full min-h-screen w-screen pt-[90px] pb-[90px]">
      <div className="flex w-full max-w-full flex-col items-center justify-center gap-8 p-8 lg:gap-12 lg:p-12">
        <p className="text-center text-xl">Twin Arts Studio – Sales & Commissions</p>

        <p className="flex whitespace-pre-line">{description}</p>
      </div>
    </div>
  )
}

export default Commissions
