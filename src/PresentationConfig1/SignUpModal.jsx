import { useEffect, useState } from "react";
import Input from "../components/Input";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Button from "../components/Button";
import { signIn, signOut, useSession } from 'next-auth/react'
import { closeModal } from "@/utils/modalControl";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from "axios";
import SignUp from "../layout/login/signUp";



export default function SignUpModal() {


    return (
        <div class="modal fade" id="signUpPresentationModal" tabindex="-1" aria-labelledby="signUpPresentationModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-0">
                        <img src="/LOGO_01.png" alt="" height={40} />

                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                        <div class="modal-body">
                            <SignUp />
                        </div>

                </div>
            </div>
        </div>
    )
}