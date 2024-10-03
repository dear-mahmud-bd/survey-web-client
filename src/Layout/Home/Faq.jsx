

const Faq = () => {
    return (
        <div className="my-10">
            <div className="flex flex-col md:flex-row items-center gap-10 p-4 md:p-10">
                <p className="md:w-1/2 sm:text-4xl text-3xl font-extrabold text-base-content">Frequently Asked Questions</p>
                <div className="container mx-auto p-4">
                    <div className="join join-vertical w-full">
                        <div className="collapse collapse-plus join-item border-base-300 border-b-2">
                            <input type="radio" name="my-accordion-4" defaultChecked />
                            <div className="collapse-title text-xl font-medium">What is a Survey?</div>
                            <div className="collapse-content">
                                <p>
                                    A survey collects feedback from individuals to understand their opinions, preferences, or experiences on various topics. It can be used for market research, product development, customer satisfaction, and more.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border-base-300 border-b-2">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">How can I create a survey?</div>
                            <div className="collapse-content">
                                <p>
                                    Only registered users with the &apos;surveyor&apos; role can create surveys. After signing in, navigate to the Surveyor Dashboard to start creating surveys. You can add questions, options, and categories for the survey.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border-base-300 border-b-2">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">Can I vote on surveys?</div>
                            <div className="collapse-content">
                                <p>
                                    Yes! All logged-in users can participate in public surveys by casting their votes. Users can view survey results after submitting their responses or when the survey deadline has passed.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border-base-300 border-b-2">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">What are pro-user features?</div>
                            <div className="collapse-content">
                                <p>
                                    Pro-users can access advanced features such as commenting on surveys, viewing survey statistics in different chart formats, and participating in discussions. A pro-user membership can be obtained through our pricing page.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border-base-300 border-b-2">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">How do I manage my surveys?</div>
                            <div className="collapse-content">
                                <p>
                                    If you are a surveyor, you can manage your surveys through the Surveyor Dashboard. You can update, publish, or unpublish surveys and view the detailed responses for each survey.
                                </p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus join-item border-base-300">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">Can I report inappropriate surveys?</div>
                            <div className="collapse-content">
                                <p>
                                    Yes, users can report any surveys that they find inappropriate. Our team will review the reports, and necessary actions will be taken.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;