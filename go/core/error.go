package core

type Openf1CarDataError struct {
	IsOpenf1CarDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpenf1CarDataError(code string, msg string, ctx *Context) *Openf1CarDataError {
	return &Openf1CarDataError{
		IsOpenf1CarDataError: true,
		Sdk:              "Openf1CarData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *Openf1CarDataError) Error() string {
	return e.Msg
}
