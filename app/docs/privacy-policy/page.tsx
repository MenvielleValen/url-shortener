export default function PrivacyPolicyPage(){
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow-lg mt-8">
        <h1 className="text-2xl font-bold mb-4">MinLink Privacy Policy</h1>
        <p className="text-gray-800 mb-4">MinLink is committed to protecting the privacy of its users. This privacy policy
            describes how MinLink collects, uses, and protects the personal information it receives from its users.</p>

        <h2 className="text-xl font-bold mb-2">Information Collected</h2>
        <p className="text-gray-800 mb-4">MinLink collects the following personal information from its users:</p>
        <ul className="list-disc list-inside text-gray-800 mb-4">
            <li>Name</li>
            <li>Email Address</li>
            <li>Profile Picture (in case of authentication through Google or GitHub)</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">Use of Information</h2>
        <p className="text-gray-800 mb-4">The collected information is used for the following purposes:</p>
        <ul className="list-disc list-inside text-gray-800 mb-4">
            <li>Provide access to link shortening functionality.</li>
            <li>Personalize the user experience within the application.</li>
            <li>Send notifications related to the use of the application.</li>
            <li>Improve and optimize the services offered by MinLink.</li>
        </ul>



        <p className="text-gray-800 mb-4">For questions or concerns about this privacy policy, users can contact MinLink at
            desarrollo.mcd@gmail.com.</p>
        <p className="text-gray-800 mb-4">Last updated: 30/01/2024</p>
    </div>
  )
}
