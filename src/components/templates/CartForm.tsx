import { useForm, RegisterOptions } from 'react-hook-form'

export default function Cart() {
  type Form = {
    first_name: string
    last_name: string
    email: string
    phone: string
    card_number: number
    card_date: number
    card_cvc: number
    zip: number
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>()

  const rules: { [key in keyof Form]: RegisterOptions } = {
    first_name: { required: true, minLength: 2 },
    last_name: { required: true, minLength: 2 },
    email: { required: true },
    phone: { required: true, minLength: 6 },
    card_number: { required: true },
    card_date: { required: true, minLength: 4, maxLength: 4 },
    card_cvc: { required: true, minLength: 3, maxLength: 3 },
    zip: { required: true, minLength: 6, maxLength: 6 },
  }

  const addStyleError = (error) => {
    if (error)
      return { label: ' text-rose-500', input: ' border border-rose-500' }
    else return { label: '', input: '' }
  }

  const onSubmit = (data: Form) => alert(JSON.stringify(data, null, 4))

  return (
    <div className="bg-white py-12 md:py-24">
      <div className="mx-auto max-w-lg px-4 lg:px-8">
        <form
          className="grid grid-cols-6 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-3">
            <label
              className={
                'mb-1 block text-sm text-gray-600' +
                addStyleError(errors.first_name).label
              }
            >
              First Name
            </label>

            <input
              className={
                'w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm' +
                addStyleError(errors.first_name).input
              }
              type="text"
              {...register('first_name', rules.first_name)}
            />
          </div>

          <div className="col-span-3">
            <label
              className={
                'mb-1 block text-sm text-gray-600' +
                addStyleError(errors.last_name).label
              }
            >
              Last Name
            </label>

            <input
              className={
                'w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm' +
                addStyleError(errors.last_name).input
              }
              type="text"
              id="last_name"
              {...register('last_name', rules.last_name)}
            />
          </div>

          <div className="col-span-6">
            <label
              className={
                'mb-1 block text-sm text-gray-600' +
                addStyleError(errors.email).label
              }
            >
              Email
            </label>

            <input
              className={
                'w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm' +
                addStyleError(errors.email).input
              }
              type="email"
              {...register('email', rules.email)}
            />
          </div>

          <div className="col-span-6">
            <label
              className={
                'mb-1 block text-sm text-gray-600' +
                addStyleError(errors.phone).label
              }
            >
              Phone
            </label>

            <input
              className={
                'w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm' +
                addStyleError(errors.phone).input
              }
              type="number"
              {...register('phone', rules.phone)}
            />
          </div>

          <fieldset className="col-span-6">
            <legend className="mb-1 block text-sm text-gray-600">
              Card Details
            </legend>

            <div className="-space-y-px rounded-lg bg-white shadow-sm">
              <div>
                <label className="sr-only">Card Number</label>

                <input
                  className={
                    'relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10' +
                    addStyleError(errors.card_number).input
                  }
                  type="number"
                  placeholder="Card number"
                  {...register('card_number', rules.card_number)}
                />
              </div>

              <div className="flex -space-x-px">
                <div className="flex-1">
                  <label className="sr-only">Expiration Date</label>

                  <input
                    className={
                      'relative w-full rounded-bl-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10' +
                      addStyleError(errors.card_date).input
                    }
                    type="number"
                    placeholder="MM / YY"
                    {...register('card_date', rules.card_date)}
                  />
                </div>

                <div className="flex-1">
                  <label className="sr-only">CVC</label>

                  <input
                    className={
                      'relative w-full rounded-br-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10' +
                      addStyleError(errors.card_cvc).input
                    }
                    type="number"
                    placeholder="CVC"
                    {...register('card_cvc', rules.card_cvc)}
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="col-span-6">
            <legend className="mb-1 block text-sm text-gray-600">
              Billing Address
            </legend>

            <div className="-space-y-px rounded-lg bg-white shadow-sm">
              <div>
                <label className="sr-only">Country</label>

                <select className="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm focus:z-10">
                  <option value={'russia'}>Russia</option>
                </select>
              </div>

              <div>
                <label className="sr-only">ZIP/Post Code</label>

                <input
                  className={
                    'relative w-full rounded-b-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10' +
                    addStyleError(errors.zip).input
                  }
                  type="number"
                  placeholder="ZIP/Post Code"
                  {...register('zip', rules.zip)}
                />
              </div>
            </div>
          </fieldset>

          <div className="col-span-6">
            <button
              className="block w-full rounded-lg bg-black p-2.5 text-sm text-white"
              type="submit"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
