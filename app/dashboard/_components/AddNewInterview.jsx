"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModel'
import { LoaderPinwheel } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { db } from '@/utils/db'
import { useRouter } from 'next/navigation'


function AddnewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState()
    const [jobDescription, setJobDescription] = useState()
    const [jobExperience, setJobExperience] = useState()
    const [loading, setloading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        setloading(true)
        e.preventDefault() //to prevent the event from referesh
        console.log(jobDescription, jobPosition, jobExperience);
        const InputPrompt = "Job Position: " + jobPosition + ", job description : " + jobDescription + ",years of experience: " + jobExperience + " depend on this info please give me 5 interview question with answerin json format, give question and answer as field in json"

        const result = await chatSession.sendMessage(InputPrompt);

        const MockjsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        setJsonResponse(MockjsonResp)
        if (MockjsonResp) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: MockjsonResp,
                    jobPosition: jobPosition,
                    jobDescription: jobDescription,
                    jobExperience: jobExperience,
                    createdBy: user?.primaryEmailAddress?.emailAddress, //error a raha mockid me check karna hai 1:37
                    createdAt: moment().format('DD-MM-yyyy')
                }).returning({ mockId: MockInterview.mockId })
            if (resp) {
                setOpenDialog(false);
                router.push('dashboard/interview/' + resp[0]?.mockId)
            }
        }
        else {
            console.log("Error");
        }
        setloading(false)
    }
    return (

        <div>
            <div className='p-10 border rounded-lg bg-secondary 
        hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>

                <h2 className='font-bold text-lg text-center'>+ Add New</h2>

            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Tell Us More About Your Job Interviewing</DialogTitle>
                        <DialogDescription>
                            Add Details About Your Job Position/Role, Job Description, and Years Of Experience
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onSubmit}>
                        <div>
                            <div className="mt-7 my-3">
                                <label>Job Role/Job Position</label>
                                <Input
                                    className="mt-3"
                                    placeholder="Ex. Software Developer"
                                    required
                                    onChange={(event) => setJobPosition(event.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <label>Job Description</label>
                                <Textarea
                                    className="mt-3"
                                    placeholder="Ex. DBMS, CN, React, NodeJs etc"
                                    required
                                    onChange={(event) => setJobDescription(event.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <label>Years Of Experience</label>
                                <Input
                                    className="mt-3"
                                    placeholder="Ex. 5"
                                    type="number"
                                    required
                                    onChange={(event) => setJobExperience(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex gap-5 justify-end">
                            <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <LoaderPinwheel className="animate-spin" /> Generating...
                                    </>
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>



        </div>
    )
}

export default AddnewInterview
